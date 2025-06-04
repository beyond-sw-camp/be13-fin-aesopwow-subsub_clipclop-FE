import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import notoSansKRBase64 from "../fonts/NotoSansKR-Regular.base64";

// 1. 폰트 등록
jsPDF.API.addFileToVFS("NotoSansKR-Regular.ttf", notoSansKRBase64);
jsPDF.API.addFont("NotoSansKR-Regular.ttf", "NotoSansKR", "normal");