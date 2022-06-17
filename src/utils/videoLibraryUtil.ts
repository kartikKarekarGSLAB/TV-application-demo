const DURATION_SPLIT_CHAR = ':';
const HOUR_POSTFIX = 'h';
const MIN_POSTFIX = 'm';
const SEC_POSTFIX = 's';
const TIME_CONCAT_CHAR = ' ';

/**
 * This will update generate the duration string from the passed formatted
 * time string.
 * @param duration {string} duration string form response
 * @returns formatted duration.
 */
function getDurationFormat(duration: string): string {
    if (duration) {
        const durationContent = duration.split(DURATION_SPLIT_CHAR);
        if (durationContent.length === 1) {
            return durationContent[0] + TIME_CONCAT_CHAR + SEC_POSTFIX;
        } else if (durationContent.length === 2) {
            return (
                durationContent[0] +
                TIME_CONCAT_CHAR +
                MIN_POSTFIX +
                TIME_CONCAT_CHAR +
                durationContent[1] +
                TIME_CONCAT_CHAR +
                SEC_POSTFIX
            );
        } else if (durationContent.length === 3) {
            return (
                durationContent[0] +
                TIME_CONCAT_CHAR +
                HOUR_POSTFIX +
                TIME_CONCAT_CHAR +
                durationContent[1] +
                TIME_CONCAT_CHAR +
                MIN_POSTFIX +
                TIME_CONCAT_CHAR +
                durationContent[2] +
                TIME_CONCAT_CHAR +
                SEC_POSTFIX
            );
        }
    }
    return '';
}

export { getDurationFormat };
