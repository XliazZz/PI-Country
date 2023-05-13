const validationActivity = (activityData) => {
    const errors = {};

    if (!activityData.name) {
        errors.name = 'The name field is required.';
    } else if (activityData.name.length < 2 || activityData.name.length > 50) {
        errors.name = 'The name must be between 2 and 50 characters long.';
    } else if (!/^[a-zA-Z0-9 ]+$/.test(activityData.name)) {
        errors.name = 'Names can only contain letters, numbers, and spaces.';
    }

    if (!activityData.difficulty) {
        errors.difficulty = 'Please select a difficulty level.';
    } else if (isNaN(activityData.difficulty) || activityData.difficulty < 1 || activityData.difficulty > 5) {
        errors.difficulty = 'Difficulty must be a number between 1 and 5.';
    }

    if (!activityData.duration) {
        errors.duration = 'Please enter the duration in minutes.';
    } else if (isNaN(activityData.duration) || activityData.duration <= 0 || activityData.duration > 1440) {
        errors.duration = 'Invalid duration. Please enter a number greater than 0 and less than or equal to 1440.';
    }

    if (!activityData.season) {
        errors.season = 'Please select a season.';
    } else if (!['Summer', 'Autumn', 'Winter', 'Spring'].includes(activityData.season)) {
        errors.season = 'Invalid season. Please select one of the available options (Summer, Autumn, Winter, Spring).';
    }

    return errors;
}

export default validationActivity;