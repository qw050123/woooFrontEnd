export const useFormRule = () => {
  let required = (value: any) => {
    return !!value || '此欄位為必填';
  };
  let emailRule = (value: string) => {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (!!value && regex.test(value)) || '請輸入符合信箱格式之文字';
  };
  let passwordRule = (value: string) => {
    return (!!value && value.length >= 8) || '密碼必須包含至少 8 個字元';
  };
  return {
    required,
    emailRule,
    passwordRule
  };
};
