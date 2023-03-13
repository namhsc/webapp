/* eslint-disable import/no-anonymous-default-export */
// token
export const TOKEN_NOT_VALID = 'Token không hợp lệ';
export const NOT_AUTHENTICATED = 'Chưa xác thực';
export const NOT_ALLOWED = 'Không được phép';

// auth
export const USERNAME_NOT_VALID = 'Email/SĐT không hợp lệ';
export const USERNAME_REQUIRED = 'Email/SĐT không được bỏ trống';
export const NAME_NOT_VALID = 'Tên không hợp lệ';
export const NAME_REQUIRED = 'Tên Không được bỏ trống';
export const EMAIL_NOT_VALID = 'Email không hợp lệ';
export const EMAIL_REQUIRED = 'Email không được bỏ trống';
export const EMAIL_NOT_ACTIVATE = 'Email chưa kích hoạt';
export const PASSWORD_NOT_VALID = 'Mật khẩu không hợp lệ';
export const PASSWORD_REQUIRED = 'Mật khẩu không được bỏ trống';
export const CONFIRM_PASSWORD_LENGTH = 'Mật khẩu phải từ 6-50 ký tự';
export const CONFIRM_PASSWORD_REQUIRED =
  'Nhập lại mật khẩu không được bỏ trống';
export const PHONE_NOT_VALID = 'Số điện thoại không hợp lệ';
export const ADDRESS_NOT_VALID = 'Địa chỉ không hợp lệ';
export const EMAIL_EXIST = 'Email đã tồn tại';
export const EMAIL_NOT_EXIST = 'Email không tồn tại';
export const PHONE_EXIST = 'Số điện thoại đã tồn tại';
export const USER_NOT_CREATE = 'Không tạo được người dùng, vui lòng thử lại';
export const USER_CREATE_SUCCESS =
  'Tạo người dùng thành công, vui lòng đăng nhập';
export const USER_NOT_FOUND = 'Không tìm thấy người dùng';
export const PASSWORD_NOT_MATCH = 'Mật khẩu không khớp';
export const LOGIN_SUCCESS = 'Đăng nhập thành công';
export const LOGIN_INCORRECT = 'Thông tin đăng nhập không đúng';

// user
export const NAME_NOT_CHANGE = 'Tên không thay đổi';
export const NAME_CHANGE_SUCCESS = 'Thay đổi tên thành công';
export const EMAIL_NOT_CHANGE = 'Email không thay đổi';
export const EMAIL_CHANGE_SUCCESS = 'Thay đổi email thành công';
export const PASSWORD_NOT_CHANGE = 'Mật khẩu không thay đổi';
export const PASSWORD_CHANGE_SUCCESS = 'Thay đổi mật khẩu thành công';
export const PASSWORD_LENGTH = 'Mật khẩu phải từ 6-50 ký tự';
export const PHONE_NOT_CHANGE = 'Số điện thoại không thay đổi';
export const PHONE_CHANGE_SUCCESS = 'Thay đổi số điện thoại thành công';
export const ADDRESS_NOT_CHANGE = 'Địa chỉ không thay đổi';
export const ADDRESS_CHANGE_SUCCESS = 'Thay đổi địa chỉ thành công';
export const USER_NOT_DELETE = 'Không xóa được người dùng, vui lòng thử lại';
export const USER_DELETE_SUCCESS = 'Xóa người dùng thành công';
export const USER_FOUND = 'Tìm thấy người dùng';

// otp
export const OTP_SUCCESS = 'Gửi mã OTP thành công';
export const OTP_UNSUCCESS = 'Gửi mã OTP không thành công';
export const OTP_REQUIRED = 'OTP không  được bỏ trống';
export const OTP_NOT_VALID = 'OTP không hợp lệ';

// error
export const ERROR = 'Xảy ra lỗi. Vui lòng thử lại';

export default {
  // token
  TOKEN_NOT_VALID,
  NOT_AUTHENTICATED,
  NOT_ALLOWED,

  // auth
  USERNAME_NOT_VALID,
  USERNAME_REQUIRED,
  NAME_NOT_VALID,
  NAME_REQUIRED,
  EMAIL_NOT_VALID,
  EMAIL_REQUIRED,
  PASSWORD_NOT_VALID,
  PASSWORD_REQUIRED,
  CONFIRM_PASSWORD_REQUIRED,
  CONFIRM_PASSWORD_LENGTH,
  PHONE_NOT_VALID,
  ADDRESS_NOT_VALID,
  EMAIL_EXIST,
  EMAIL_NOT_EXIST,
  PHONE_EXIST,
  USER_NOT_CREATE,
  USER_CREATE_SUCCESS,
  USER_NOT_FOUND,
  PASSWORD_NOT_MATCH,
  LOGIN_SUCCESS,
  LOGIN_INCORRECT,

  // user
  NAME_NOT_CHANGE,
  NAME_CHANGE_SUCCESS,
  EMAIL_NOT_CHANGE,
  EMAIL_CHANGE_SUCCESS,
  PASSWORD_NOT_CHANGE,
  PASSWORD_CHANGE_SUCCESS,
  PHONE_NOT_CHANGE,
  PHONE_CHANGE_SUCCESS,
  ADDRESS_NOT_CHANGE,
  ADDRESS_CHANGE_SUCCESS,
  USER_NOT_DELETE,
  USER_DELETE_SUCCESS,
  USER_FOUND,

  // otp
  OTP_SUCCESS,
  OTP_UNSUCCESS,
  OTP_REQUIRED,
  OTP_NOT_VALID,

  // error
  ERROR,
};
