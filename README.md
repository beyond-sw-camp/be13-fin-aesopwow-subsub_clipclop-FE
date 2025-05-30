# be13-fin-1team-2 

## 🧪 기능 테스트 목록

[👉 전체 테스트 개요 (Notion 링크)](https://www.notion.so/playdatacademy/203d943bcac280a9bdbec7fae4e084c7?v=203d943bcac280d58340000c6bb4e98c)

### 📊 대시보드
- [카드 부분](https://www.notion.so/203d943bcac280809111c85608e51b60?pvs=21)
- [그래프 부분](https://www.notion.so/203d943bcac280d0a52ac6049656a699?pvs=21)

### 🔐 로그인 / 회원가입
- [Email 텍스트 필드](https://www.notion.so/Email-203d943bcac280b891d5d3c6613a58a4?pvs=21)
- [Password 텍스트 필드](https://www.notion.so/Password-203d943bcac28087a565d57898038375?pvs=21)
- [Remember Me 체크박스](https://www.notion.so/Remember-Me-203d943bcac280fa9bf9dfd56dc8a506?pvs=21)
- [Forgot Password? 링크 버튼](https://www.notion.so/Forgot-Password-203d943bcac2803f8eafccc2a08f5253?pvs=21)
- [Create New Account 링크 버튼](https://www.notion.so/Create-New-Account-203d943bcac28045964bd181239daed6?pvs=21)

### 💳 멤버십 페이지
- [월간/연간](https://www.notion.so/203d943bcac28096be49dda7ffbb048a?pvs=21)
- [단순 패널 클릭](https://www.notion.so/203d943bcac28093bedfe032fb168657?pvs=21)
- [가입하기](https://www.notion.so/203d943bcac28098b199f1f7ddaed2b5?pvs=21)

### 📈 구독 유형
- [내림차순 유/무](https://www.notion.so/203d943bcac280c19de0d38860e8ef7d?pvs=21)
- [필터 추가](https://www.notion.so/203d943bcac280eb9e5fe5c32e64d214?pvs=21)
- [특정 내용 선택](https://www.notion.so/203d943bcac280b48fd1fd1d5516042f?pvs=21)

### 🎬 선호 장르
- [기본 페이지](https://www.notion.so/203d943bcac280e49141c35016a4fd81?pvs=21)
- [내림차순 유/무](https://www.notion.so/203d943bcac280ff9b6ce8e339b2c765?pvs=21)
- [필터 추가](https://www.notion.so/203d943bcac280269dc5f9565476d853?pvs=21)

### 👥 About Us
- [About Us 페이지](https://www.notion.so/about-us-203d943bcac2804d90a9d9e663b2f685?pvs=21)

### 📊 코호트 분석 (단일 분석)
- [클러스터 선택](https://www.notion.so/203d943bcac280dd9baedc9009ab3f78?pvs=21)
- [결과 페이지](https://www.notion.so/203d943bcac280e4a409d88fbb55f0c5?pvs=21)
- [유저 데이터](https://www.notion.so/203d943bcac28040a2bcc18bbd2600f6?pvs=21)
- [유저 데이터 필드 선택](https://www.notion.so/203d943bcac280c6a33ec2a1d8f3f3fc?pvs=21)

### 📊 코호트 분석 (이중 분석)
- [클러스터 선택](https://www.notion.so/203d943bcac2800eadcbfe58b68cc65b?pvs=21)
- [클러스터 겹침 방지 기능](https://www.notion.so/203d943bcac280658d01d024a06fef29?pvs=21)
- [결과 페이지](https://www.notion.so/203d943bcac2809a9abacc308c1e0f06?pvs=21)
- [시각화 클러스터 선택](https://www.notion.so/203d943bcac28025825cef092fbd4acc?pvs=21)

### 👤 유저 분석
- [유저 데이터 페이지](https://www.notion.so/203d943bcac280e5a2cef542dfc67180?pvs=21)
- [유저 데이터 필드 선택](https://www.notion.so/203d943bcac28094ad03df6b1456d69b?pvs=21)
- [유저 클러스터 선택](https://www.notion.so/203d943bcac280dbaff1d2bf23404ee5?pvs=21)

### 📌 프로그램 사양서

| **구성 요소**      | **사양**                                                                 |
|--------------------|--------------------------------------------------------------------------|
| **프론트엔드** | React, TypeScript, Zustand, Tailwind CSS, Material Tailwind, Vite, Chart.js, PapaParse, Axios, Lucide/Heroicons       |
| **백엔드**  | Spring Boot 3.4.4, Java 21, Spring Security, Spring Data JPA, Spring Validation, Spring Mail, Redis, JWT, Swagger (SpringDoc), Lombok, Gradle |
| **분석 서버**       | Flask 3.1.0, Gunicorn, XGBoost, Pandas, NumPy, SciPy, Flask-SQLAlchemy, PyMySQL, Marshmallow, Boto3 (S3), python-dotenv         |
| **데이터베이스**            | MariaDB (RDS, db.t3.medium)                                 |
| **스토리지**             | AWS S3 (5GB 표준 스토리지, 5개 버킷 사용)     |
| **배포 서버**             | AWS EC2 (Frontend: t2.medium, Backend: t3.large, AI: t2.medium)     |
