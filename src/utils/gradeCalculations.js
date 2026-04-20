// This file defines the rules for calculating SGPA and CGPA.

// The official grade point mapping. 'F' or any other grade will be 0.
const gradeToPoint = {
    'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'F': 0,
};

/**
 * Calculates the SGPA for a given set of results for one semester.
 * @param {Array} semesterResults - An array of result objects for a single semester.
 * @returns {string} The calculated SGPA, formatted to two decimal places.
 */
export const calculateSGPA = (semesterResults) => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesterResults.forEach(result => {
        const point = gradeToPoint[result.grade] || 0;
        totalPoints += point * result.credits;
        totalCredits += result.credits;
    });

    if (totalCredits === 0) return "0.00";
    return (totalPoints / totalCredits).toFixed(2);
};

/**
 * Calculates the CGPA up to a given semester.
 * @param {Array} allResults - An array of ALL result objects for a student.
 * @param {number} currentSemester - The semester up to which CGPA should be calculated.
 * @returns {string} The calculated CGPA, formatted to two decimal places.
 */
export const calculateCGPA = (allResults, currentSemester) => {
    const relevantResults = allResults.filter(result => result.semester <= currentSemester);
    let totalPoints = 0;
    let totalCredits = 0;

    relevantResults.forEach(result => {
        const point = gradeToPoint[result.grade] || 0;
        totalPoints += point * result.credits;
        totalCredits += result.credits;
    });

    if (totalCredits === 0) return "0.00";
    return (totalPoints / totalCredits).toFixed(2);
};