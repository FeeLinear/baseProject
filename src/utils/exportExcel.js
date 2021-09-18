
import CommonUtil from "@/utils/commonUtil";
export default function exportExcel(url, data) {
  const { jsCurAccNo, jsToken } = CommonUtil.getRqHeader();
  const params = Object.assign({}, {jsCurAccNo, jsToken}, data)
  // let defaultSort = sessionStorage.getItem("aibrainOrder");
  // if (defaultSort) {
  //   defaultSort = JSON.parse(defaultSort);
  // }
  // const {prop, order} = defaultSort
  // if(prop,order){
  //   params.orderBy = `${prop} ${order == 'descending'?'desc':'asc'}`
  // }
  const form = document.createElement("form");
  document.body.appendChild(form);
  form.setAttribute("action", url);
  form.setAttribute("target", "_blank");
  form.setAttribute("style", "display:none");
  // 构造参数
  let name, value, inputDom;
  for (name in params) {
    value = params[name];
    if (value) {
      inputDom = document.createElement("input");
      inputDom.setAttribute("name", name);
      inputDom.setAttribute(
        "value",
        value instanceof Object ? JSON.stringify(value) : value
      );
      form.appendChild(inputDom);
    }
  }
  form.submit();
  // loading
  // gc
  document.body.removeChild(form);
  name = null;
  value = null;
  inputDom = null;
}