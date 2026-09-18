document.addEventListener("DOMContentLoaded", () => {
  // 各ステップ要素を取得
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const step3 = document.getElementById("step-3");

  // 遷移ボタンを取得
  const btnToStep2 = document.getElementById("btn-to-step2");
  const btnToStep3Record = document.getElementById("btn-to-step3-record");
  const btnToStep3Skip = document.getElementById("btn-to-step3-skip");

  // 今日の日付と現在時刻を自動入力する関数
  const setCurrentTime = (inputId) => {
    const input = document.getElementById(inputId);
    if (input && !input.value) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      input.value = `${hours}:${minutes}`;
    }
  };

  // 初期セット
  const today = new Date().toISOString().split("T")[0];
  const visitDateInput = document.getElementById("visit-date");
  if (visitDateInput) visitDateInput.value = today;

  setCurrentTime("arrival-time");

  // 1枚目「今日のログを開始」 -> 2枚目へ
  if (btnToStep2) {
    btnToStep2.addEventListener("click", () => {
      step1.classList.add("hidden");
      step2.classList.remove("hidden");
      setCurrentTime("standup-time");
    });
  }

  // 2枚目「記録して開始」 -> 3枚目へ
  if (btnToStep3Record) {
    btnToStep3Record.addEventListener("click", () => {
      step2.classList.add("hidden");
      step3.classList.remove("hidden");
    });
  }

  // 2枚目「すでに立って待っています」 -> 3枚目へ
  if (btnToStep3Skip) {
    btnToStep3Skip.addEventListener("click", () => {
      step2.classList.add("hidden");
      step3.classList.remove("hidden");
    });
  }
});