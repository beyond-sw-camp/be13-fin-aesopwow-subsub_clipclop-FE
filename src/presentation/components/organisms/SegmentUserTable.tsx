import { User } from "@/mocks/mockSegmentUsers";

interface Props {
    users: User[];
    sortKey?: "age" | "country" | null;
    sortOrder?: "asc" | "desc";
}

export function SegmentUserTable({ users }: Props) {
    return (
        <div>
            <h3 className="font-bold mb-2">전체 사용자 목록</h3>
            <table
                className="min-w-full text-sm text-left bg-black text-white rounded"
                aria-label="전체 사용자 목록"
            >
                <thead className="bg-gray-800">
                    <tr>
                        <th scope="col" className="px-3 py-2">User_ID</th>
                        <th scope="col" className="px-3 py-2">Name</th>
                        <th scope="col" className="px-3 py-2">Age</th>
                        <th scope="col" className="px-3 py-2">Country</th>
                        <th scope="col" className="px-3 py-2">Watch_Time_Hours</th>
                        <th scope="col" className="px-3 py-2">Favorite_Genre</th>
                        <th scope="col" className="px-3 py-2">Last_Login</th>
                        <th scope="col" className="px-3 py-2">Subscription</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.userId} className="border-t border-gray-700">
                            <td className="px-3 py-1">{user.userId}</td>
                            <td className="px-3 py-1">{user.name}</td>
                            <td className="px-3 py-1">{user.age}</td>
                            <td className="px-3 py-1">{user.country}</td>
                            <td className="px-3 py-1">{user.watchTimeHours}</td>
                            <td className="px-3 py-1">{user.favoriteGenre}</td>
                            <td className="px-3 py-1">{user.lastLogin}</td>
                            <td className="px-3 py-1">{user.subscription}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
