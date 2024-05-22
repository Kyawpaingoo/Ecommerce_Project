import { useTheme } from '@emotion/react';
import { FormControl, MenuItem, Select } from '@mui/base';
import { Box, Chip, InputLabel, OutlinedInput } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedItems, theme) {
    return {
      fontWeight:
      selectedItems.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const SelectDropdown = ({label, options=[], onChange, selectItems}) => {
    const theme = useTheme();
    
    const handleChange = (event)=>{
        const {
            target: {value}
        } = event;
        onChange(value);
    }
  return (
    <FormControl sx={{m: 1, width: 300}}>
        <InputLabel>{label}</InputLabel>
        <Select
        label={label}
        multiple
        value={selectItems}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected)=>{
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
        }}
        MenuProps={MenuProps}
        >
            {
                options.map((d)=>(
                    <MenuItem key={d._id}
                    value={d}
                    style={getStyles(d, selectItems, theme)}
                    >
                        {d}
                    </MenuItem>
                ))
            }
        </Select>
    </FormControl>
  )
}

export default SelectDropdown