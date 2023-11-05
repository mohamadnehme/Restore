import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface Props {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}

export default function RadioButtonGroup({ options, onChange, selectedValue }: Props) {
    return (
        <FormControl>
            <RadioGroup
                sx={{ my: 1 }}
                onChange={onChange}
                value={selectedValue}
            >
                {options.map(({ value, label }) => (
                    <FormControlLabel value={value} control={<Radio />} label={label} key={value} />
                ))}
            </RadioGroup>
        </FormControl>
    )
}