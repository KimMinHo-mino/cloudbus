document.addEventListener("DOMContentLoaded", () => {
    
    // API에서 받아오는 값을 a에 저장하는 코드로 추후 수정할 것
    const a = {
        'station': { 'name': '상명대정문', 'id': '100000180' },
        "7016": { 'first': '4', 'second': '4', 'first_bus': '3', 'second_bus': '3' },
        "서대문08": { 'first': '4', 'second': '4', 'first_bus': '3', 'second_bus': '3'}, 'peopleNum': '155' };

    // 버스 내부 혼잡도 업데이트
    const congestionLevelSpan = document.getElementById("congestion-level");
    const firstBus = a["7016"]["first_bus"];
    if (firstBus === '3') {
        congestionLevelSpan.textContent = "여유";
    } else if (firstBus === '4') {
        congestionLevelSpan.textContent = "보통";
    } else if (firstBus === '5') {
        congestionLevelSpan.textContent = "혼잡";
    }

    // 정류장 인원 업데이트
    const availableSeatsSpan = document.getElementById("available-seats");
    availableSeatsSpan.textContent = a["peopleNum"];

    // 탑승 가능 인원 업데이트
    const boardingStatusSpan = document.getElementById("boarding-status");
    let boardingSeats = 0;
    if (firstBus === '3') {
        boardingSeats = 40;
    } else if (firstBus === '4') {
        boardingSeats = 25;
    } else if (firstBus === '5') {
        boardingSeats = 10;
    }
    boardingStatusSpan.textContent = boardingSeats;

    // 탑승 가능 여부 업데이트
    const currentStopSpan = document.getElementById("current-stop");
    const peopleNum = parseInt(a["peopleNum"], 10);
    currentStopSpan.textContent = peopleNum > boardingSeats ? "불가" : "가능";
});
