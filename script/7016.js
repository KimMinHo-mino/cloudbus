document.addEventListener("DOMContentLoaded", async () => {
    const apiUrl = "https://7zd3f88t2d.execute-api.ap-northeast-3.amazonaws.com/CloudBus/calls3";

    try {
        // API 요청
        const response = await fetch(apiUrl);

        // 응답 상태 확인
        if (!response.ok) {
            throw new Error(`HTTP 오류 발생: ${response.status}`);
        }

        // JSON 데이터 가져오기
        const data = await response.json();
        const a = JSON.parse(data.body);
        console.log("받아온 데이터:", a);
        
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
        else {
            congestionLevelSpan.textContent ="버스 없음";
        }

         // 정류장 인원 업데이트
        const availableSeatsSpan = document.getElementById("available-seats");
        availableSeatsSpan.textContent = a["peopleNum"];

        // 탑승 가능 인원 업데이트
        const boardingStatusSpan = document.getElementById("boarding-status");
        let boardingSeats = 0;
        if (firstBus === '3') {
            boardingSeats = 25;
        } else if (firstBus === '4') {
            boardingSeats = 15;
        } else if (firstBus === '5') {
            boardingSeats = 8;
        }
        else {
            boardingSeats = "버스 없음";
        }
        boardingStatusSpan.textContent = boardingSeats;

        // 탑승 가능 여부 업데이트
        const currentStopSpan = document.getElementById("current-stop");
        const peopleNum = parseInt(a["peopleNum"], 10);
        if (boardingSeats === "버스 없음") {
            currentStopSpan.textContent = "불가";
        } else if (peopleNum > boardingSeats) {
            currentStopSpan.textContent = "불가";
        } else {
            currentStopSpan.textContent = "가능";
        }        
            

    } catch (error) {
        console.error("데이터 요청 중 오류 발생:", error);
    }

});
