import FormControl from '@mui/material/FormControl/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { Divider } from '@mui/material';

type PropsFilter = {
  value: string;
  label: string;
};

type PropsFilterComponent = {
  listFilter: PropsFilter[];
  actionFilter: (value: string) => void;
};

export const FilterSections = (props: PropsFilterComponent) => {
  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel id="demo-radio-buttons-group-label">Filtros</FormLabel>
      <Divider />
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {props.listFilter.map((filter, index) => (
          <FormControlLabel
            key={index}
            value={filter.value}
            control={<Radio />}
            label={filter.label}
            onChange={(event: any) =>
              props.actionFilter(String(event.target.value))
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
