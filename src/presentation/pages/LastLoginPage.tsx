import { useState, useMemo } from "react";
import { Header } from "@/presentation/layout/Header";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { SegmentTemplate } from "@/presentation/components/organisms/SegmentTemplate";
import { SegmentUserTable } from "@/presentation/components/organisms/SegmentUserTable";
import { SegmentFilterBox } from "@/presentation/components/molecules/SegmentFilterBox";
import { useSegmentViewModel } from "@/application/viewModels/useSegmentViewModel";
import { sortUsersByKey } from "@/core/utils/sortUsersByKey";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import notoFont from "@/assets/fonts/NotoSansKR-Regular.ttf?url";

function formatDate(date: Date | string | undefined) {
  if (!date) return "";
  if (typeof date === "string") return date;
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function LastLoginPage() {
  const { filters, setFilters, users, isLoading, error } = useSegmentViewModel("lastLogin");

  const [sortKey, setSortKey] = useState<"age" | "country" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSortChange = (key: "age" | "country") => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedUsers = useMemo(() => {
    if (!sortKey) return users;
    return sortUsersByKey(users, sortKey, sortOrder);
  }, [users, sortKey, sortOrder]);

  const selectedFields = [
    "userId",
    "name",
    "age",
    "country",
    "watchTimeHours",
    "favoriteGenre",
    "lastLogin",
    "subscription",
  ] as const;
  type SelectedField = typeof selectedFields[number];

  const handleExport = async () => {
    const doc = new jsPDF();

    const fontBinary = await fetch(notoFont)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const binary = new Uint8Array(buffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), "");
        return btoa(binary);
      });

    doc.addFileToVFS("NotoSansKR-Regular.ttf", fontBinary);
    doc.addFont("NotoSansKR-Regular.ttf", "NotoSansKR", "normal");
    doc.setFont("NotoSansKR");
    doc.setFontSize(14);
    doc.text("User Last Login Data", 14, 15);

    const rows = sortedUsers.map((user) =>
      selectedFields.map((field: SelectedField) =>
        field === "lastLogin" ? formatDate(user[field]) : String(user[field] ?? "")
      )
    );

    autoTable(doc, {
      startY: 25,
      head: [selectedFields.map((field) => ({ content: field }))],
      body: rows,
      styles: {
        fontSize: 10,
        font: "NotoSansKR",
      },
      headStyles: {
        fillColor: [67, 160, 71],
        textColor: 255,
      },
    });

    doc.save("user_last_login_data.pdf");
  };

  return (
    <div className="min-h-screen w-screen bg-primary text-gray-800">
      <Header />
      <main className="flex">
        <div className="w-64 pt-4 pl-4">
          <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
            <SideMenu />
          </div>
        </div>

        <section className="flex-1 p-6 overflow-y-auto">
          <SegmentTemplate
            title="마지막 접속일"
            onExport={handleExport}
            filter={
              <SegmentFilterBox
                segmentType="lastLogin"
                filters={filters}
                onChange={setFilters}
                lockedKeys={["lastLogin"]}
                onSortChange={handleSortChange}
                sortKey={sortKey}
                sortOrder={sortOrder}
              />
            }
          >
            <div className="bg-white p-4 rounded shadow">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  <p className="ml-2 text-sm text-gray-500">불러오는 중...</p>
                </div>
              )}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded">
                  <p className="text-sm font-medium">오류가 발생했습니다</p>
                  <p className="text-xs">{error.message}</p>
                </div>
              )}
              {!isLoading && !error && (
                <SegmentUserTable
                  users={sortedUsers}
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                />
              )}
            </div>
          </SegmentTemplate>
        </section>
      </main>
    </div>
  );
}