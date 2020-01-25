module.exports.AUTH_REQUIRED = {
    statusCode: 401,
    code: '로그인 필요',
    message: '기능에 접근하기 위해서는 인증이 필요합니다.'
}

module.exports.NO_PERMISSIONS = {
    statusCode: 403,
    code: '권한 없음',
    message: '기능에 접근하기 위한 권한이 없습니다.'
}

module.exports.INVALID_REQUEST_BODY_FORMAT = {
    statusCode: 422,
    code: '잘못된 요청 데이터 형식',
    message: '요청한 데이터의 형식이 올바르지 않습니다.'
};

module.exports.EXISTING_EMAIL = {
    statusCode: 422,
    code: '존재하는 이메일',
    message: '이미 존재하는 이메일 입니다.'
}

module.exports.EXISTING_PARKING_LOT = {
    statusCode: 422,
    code : '존재하는 주차장',
    message: '이미 존재하는 주차장 입니다.'
}

module.exports.INVALID_VERIFICATION_CODE = {
    statusCode: 422,
    code: '잘못된 인증 코드',
    message: '올바르지 않은 인증 코드입니다.'
}

module.exports.INVALID_ACCOUNT = {
    statusCode: 422,
    code: '로그인 실패',
    message: '이메일 혹은 패스워드가 올바르지 않습니다.'
}

module.exports.INVALID_VERIFICATION_KEY = {
    statusCode: 422,
    code: '잘못된 인증 키',
    message: '올바르지 않은 인증 키입니다.'
}

module.exports.UNVERIFIED_ACCOUNT = {
    statusCode: 422,
    code: '인증되지 않은 계정',
    message: '이메일 인증을 진행해 주세요.'
}

module.exports.INVALID_REQUEST_DATA = {
    statusCode: 422,
    code: '잘못된 요청 데이터',
    message: '올바르지 않은 데이터 입니다.'
}