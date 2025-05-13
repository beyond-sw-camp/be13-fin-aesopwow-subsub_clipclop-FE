// /src/error/ErrorCode.ts

export class ErrorCode {
  public static readonly DB_INFO_NOT_FOUND = new ErrorCode('E000', 'DB 정보 없음', 404);
  public static readonly ADMIN_NOT_FOUND = new ErrorCode('E001', '관리자 정보 없음', 404);
  public static readonly USER_NOT_FOUND = new ErrorCode('E002', '사용자 없음', 404);
  public static readonly ANALYSIS_NOT_FOUND = new ErrorCode('E003', '분석 정보 없음', 404);
  public static readonly COMPANY_NOT_FOUND = new ErrorCode('E004', '회사 정보 없음', 404);
  public static readonly CSV_NOT_FOUND = new ErrorCode('E005', 'CSV 파일 없음', 404);
  public static readonly IMAGE_NOT_FOUND = new ErrorCode('E006', '이미지 파일 없음', 404);
  public static readonly REQUIRE_LIST_NOT_FOUND = new ErrorCode('E007', '요청 목록을 찾을 수 없습니다.', 404);
  public static readonly ROLE_NOT_FOUND = new ErrorCode('E008', '권한 정보를 찾을 수 없습니다.', 404);
  public static readonly MEMBERSHIP_NOT_FOUND = new ErrorCode('E009', '회사의 멤버십 정보가 없습니다.', 404);

  public static readonly EMPTY_CSV = new ErrorCode('E010', 'CSV 파일이 비어 있습니다.', 400);
  public static readonly INVALID_CSV_FORMAT = new ErrorCode('E011', 'CSV 파일 포맷이 올바르지 않습니다.', 400);
  public static readonly STAFF_LIMIT_EXCEEDED = new ErrorCode('E012', '직원 등록 한도를 초과했습니다.', 400);
  public static readonly STAFF_ALREADY_EXISTS = new ErrorCode('E013', '이미 해당 직원이 추가되어 있습니다.', 400);
  public static readonly USERNAME_REQUIRED = new ErrorCode('E014', '사용자 이름(username)은 필수 입력값입니다.', 400);
  public static readonly INVALID_PARAMS = new ErrorCode('E015', '잘못된 요청 파라미터', 400);

  public static readonly HEATMAP_READ_FAILURE = new ErrorCode('E015', '히트맵 분석 데이터 읽기 실패', 500);
  public static readonly INSIGHT_READ_FAILURE = new ErrorCode('E016', '인사이트 분석 데이터 읽기 실패', 500);
  public static readonly BEHAVIOR_PATTERN_READ_FAILURE = new ErrorCode('E017', '행동 패턴 분석 데이터 읽기 실패', 500);
  public static readonly ANALYSIS_API_CALL_FAILURE = new ErrorCode('E018', 'API 분석 요청 중 오류 발생', 500);

  public static readonly ONLY_CLIENT_USER_DELETABLE = new ErrorCode('E019', '직원만 삭제할 수 있습니다.', 403);
  public static readonly ONLY_CLIENT_ADMIN_ALLOWED = new ErrorCode('E020', '관리자 권한이 있어야 수행할 수 있습니다.', 403);

  public static readonly UNKNOWN_ERROR = new ErrorCode('E999', '알 수 없는 오류가 발생했습니다.', 500);

  private constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly status: number
  ) {}
}