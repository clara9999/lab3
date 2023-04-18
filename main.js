$(function () {
    function getMaxScoreKey(scores) {
        return Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
    }

    let currentQuiz = null;
    let answers = [];

    $("#startButton").on("click", function () {
        if (currentQuiz === null) {
            currentQuiz = 0;
            $("#question").text(questions[currentQuiz].question);
            $("#options").empty();
            questions[currentQuiz].answers.forEach(function (element, index) {
                $("#options").append(`<label><input name='options' type='radio' value='${element[1]}'>${element[0]}</label><br><br>`);
            });
            $("#startButton").attr("value", "下一題");
        } else {
            let selectedAnswer = parseInt($("input[name='options']:checked").val());
            if (!isNaN(selectedAnswer)) {
                answers[currentQuiz] = selectedAnswer;
                currentQuiz++;
                if (currentQuiz < questions.length) {
                    $("#question").text(questions[currentQuiz].question);
                    $("#options").empty();
                    questions[currentQuiz].answers.forEach(function (element, index) {
                        $("#options").append(`<label><input name='options' type='radio' value='${element[1]}'>${element[0]}</label><br><br>`);
                    });
                } else {
                    let scoreForTiger = answers[4] + answers[9];
                    let scoreForPeacock = answers[2] + answers[5];
                    let scoreForKoala = answers[1] + answers[7];
                    let scoreForOwl = answers[0] + answers[6];
                    let scoreForChameleon = answers[3] + answers[8];

                    let allScores = {
                        "老虎": scoreForTiger,
                        "孔雀": scoreForPeacock,
                        "無尾熊": scoreForKoala,
                        "貓頭鷹": scoreForOwl,
                        "變色龍": scoreForChameleon
                    };

                    let result = getMaxScoreKey(allScores);

                    $("#question").text("您的性格類型是：");
                    $("#options").empty();
                    $("#options").append(`${result}<br><br>`);
                    currentQuiz = null;
                    $("#startButton").attr("value", "重新開始");
                }
            } else {
                alert("請選擇一個選項！");
            }
        }
    });
});
