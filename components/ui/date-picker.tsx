import * as React from 'react';

export interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

/**
 * Minimal DatePicker component for use in FinancialReports and other UI.
 * Replace or enhance with a full-featured date picker as needed.
 */
export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, minDate, maxDate, disabled }) => {
  // Format date for input[type="date"] value
  const toInputValue = (date: Date | null) => date ? date.toISOString().slice(0, 10) : '';

  // Parse input[type="date"] value back to Date
  const fromInputValue = (val: string) => val ? new Date(val + 'T00:00:00') : null;

  return (
    <input
      type="date"
      value={toInputValue(value)}
      onChange={e => onChange(fromInputValue(e.target.value))}
      min={minDate ? toInputValue(minDate) : undefined}
      max={maxDate ? toInputValue(maxDate) : undefined}
      disabled={disabled}
      style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', fontSize: 16 }}
    />
  );
};

export default DatePicker;
