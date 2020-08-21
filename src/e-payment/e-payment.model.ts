export enum PaymentStatus {
    SUCCESS = "1",
    FAILED = "0",
}

export enum LangType {
    ENGLISH = "ISO-8859-1",
    UNICODE = "UTF-8",
    CHINESE_SIMPLIFIED = "GB2312",
    CHINESE_SIMPLIFIED_2 = "GD18030",
    CHINESE_TRADITIONAL = "BIG5",
}

export enum RequeryStatus {
    SUCCESS = "00",
    INVALID_PARAMTERS = "Invalid parameters",
    RECORD_NOT_FOUND = "Record not found",
    INCORRECT_AMOUNT = "Incorrect amount",
    PAYMENT_FAIL = "Payment fail",
    M88_ADMIN_FAILED = "M88Admin",
}