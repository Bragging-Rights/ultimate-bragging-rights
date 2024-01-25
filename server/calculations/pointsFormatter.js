exports.formatPoints = (point) => {
    point = String(point); // Ensure point is a string
    console.log("Initial point value:", point);

    if (point.includes('.')) {
        // If the number already has a decimal point, remove it
        point = point.replace('.', '');
    }

    const numValue = Number(point); // Convert the string to a number
    console.log("Converted to number:", numValue);

    const sign = numValue >= 0 ? '' : '-'; // Get the sign of the number
    console.log("Sign of the number:", sign);

    const absoluteValue = Math.abs(numValue); // Get the absolute value of the number
    console.log("Absolute value:", absoluteValue);

    const leftSide = String(absoluteValue).slice(0, 1); // Extract the first digit from the left
    console.log("First digit from the left:", leftSide);

    const rightSide = String(absoluteValue).slice(1); // Extract the rest of the digits
    console.log("Rest of the digits:", rightSide);

    // Combine the formatted string with only one digit on the left side of the decimal point
    const formattedResult = Number(`${leftSide}.${rightSide}`);
    console.log("Formatted result before fixing to two decimal places:", formattedResult);

    const finalResult = formattedResult.toFixed(2); // Ensure two decimal places
    console.log("Final result:", sign + finalResult);

    // return sign + finalResult;
    return  finalResult;
};