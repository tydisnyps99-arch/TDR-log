document.addEventListener("DOMContentLoaded", () => {
  // 初期値として本日の日付を自動セット
  const today = new Date().toISOString().split("T")[0];
  const visitDateInput = document.getElementById("visit-date");
  if (visitDateInput) {
    visitDateInput.value = today;
  }

  // 現在時刻を取得してセットする関数
  const setCurrentTime = (inputId) => {
    const input = document.getElementById(inputId);
    if (input) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      input.value = `${hours}:${minutes}`;
    }
  };

  setCurrentTime("arrival-time");

  // 今日のログを開始ボタンのイベント
  const btnStart = document.getElementById("btn-start");
  if (btnStart) {
    btnStart.addEventListener("click", () => {
      alert("今日のログ記録を開始しました！");
    });
  }
});