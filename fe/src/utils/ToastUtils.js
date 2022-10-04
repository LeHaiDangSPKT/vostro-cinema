import React from "react";
import * as bootstrap from "bootstrap";
import Toast from "../components/Toast";
export default function ToastUtils(id) {
  window.bootstrap = bootstrap;
  const toastLiveExample = document.getElementById(id);
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
  return <Toast text="Bạn đã đăng ký thành công" bg="bg-success" id={id} />;
}
