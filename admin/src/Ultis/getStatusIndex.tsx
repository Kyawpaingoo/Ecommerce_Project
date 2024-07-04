import { steps } from "../Pages/Order/Step"

export const getStatusIndex = (status: string): number=>{
    return steps.findIndex(step => step.label === status)
}

export const getStatusColor = (status: string): string =>{
    const index = getStatusIndex(status);
  if (index !== -1) {
    return steps[index].color;
  } else {
    return '#757575';
  }
}