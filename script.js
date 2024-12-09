document.addEventListener("DOMContentLoaded", function () {    
    const searchButton = document.getElementById("search-btn");    
    // statsContainer.style.display = "none";       
    const usernameInput = document.getElementById("user-input");    
    const statsContainer = document.querySelector(".stats-container");    
    const easyProgressCircle = document.querySelector(".easy-progress");    
    const mediumProgressCircle = document.querySelector(".medium-progress");    
    const hardProgressCircle = document.querySelector(".hard-progress");    
    const easyLabel = document.getElementById("easy-label");    
    const mediumLabel = document.getElementById("medium-label");    
    const hardLabel = document.getElementById("hard-label");    
    const cardStatsContainer = document.querySelector(".stats-cards"); // Fixed typo in query selector name
    
    function validateUsername(username) {        
        if (username.trim() === "") {            
            alert("Username should not be empty"); // Fixed grammar in alert            
            return false;        
        }        
        const regex = /^[a-zA-Z0-9]([a-zA-Z0-9_-]{0,13}[a-zA-Z0-9])?$/;        
        const isMatching = regex.test(username); // Fixed variable capitalization        
        if (!isMatching) {            
            alert("Invalid input"); // Fixed grammar in alert        
        }        
        return isMatching;    
    }
    
    async function fetchUserDetails(username) {        
        const url = `https://alfa-leetcode-api.onrender.com/userProfile/${username}`; // Fixed template literal usage        
        try {      
            searchButton.textContent = "Searching....";            
            searchButton.disabled = true; // Corrected to properly disable the button            
            const response = await fetch(url);            
            if (!response.ok) {                
                throw new Error("Unable to fetch User Details");            
            }            
            const parsedData = await response.json();            
            console.log("Logging data", parsedData);            
            displayUserData(parsedData);        
        } catch (error) {            
            statsContainer.innerHTML = `<p>${error.message}</p>`;        
        } finally {            
            searchButton.textContent = "Search";            
            searchButton.disabled = false; // Corrected to properly re-enable the button        
        }    
    }
    
    function updateProgress(solved, total, label, circle) {        
        const progressDegree = (solved / total) * 100;        
        circle.style.setProperty("--progress-degree", `${progressDegree}%`); // Added '%' for valid CSS value        
        label.textContent = `${solved}/${total}`;    
    }
    
    function displayUserData(parsedData) {        
        const totalQues = parsedData.totalQuestions;        
        const totalEasyQues = parsedData.totalEasy;        
        const totalMediumQues = parsedData.totalMedium;        
        const totalHardQues = parsedData.totalHard;        
        
        const solvedTotalQues = parsedData.matchedUserStats.acSubmissionNum[0].count;        
        const solvedTotalEasyQues = parsedData.matchedUserStats.acSubmissionNum[1].count;        
        const solvedTotalMediumQues = parsedData.matchedUserStats.acSubmissionNum[2].count;        
        const solvedTotalHardQues = parsedData.matchedUserStats.acSubmissionNum[3].count;        
        
        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);        
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);        
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);    
        const cardData =[
            {
                label: "Overall Submission", value:parsedData.totalSubmissions[0].submissions
            },
            {
                label: "Overall Easy Submission", value:parsedData.totalSubmissions[1].submissions
            },
            {
                label: "Overall Medium Submission", value:parsedData.totalSubmissions[2].submissions
            },
            {
                label: "Overall Hard Submission", value:parsedData.totalSubmissions[3].submissions
            }
        ];
        
        console.log("Card Data",cardData);
        cardStatsContainer.innerHTML = cardData.map(
            data =>
                
                `<div class='card'>
                <h4>${data.label}</h4>
                <p>${data.value}</p>
                </div>`
                
                
            ).join("")
            
        }
        
        
        
        searchButton.addEventListener("click", function () {        
            const username = usernameInput.value;        
            console.log("Logging username: ", username); // Fixed typo in console log message        
            if (validateUsername(username)) {            
                fetchUserDetails(username);        
            }    
        });
    });
    