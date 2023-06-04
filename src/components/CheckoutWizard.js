import React from 'react'
import { Stepper } from 'react-form-stepper';
const CheckoutWizard = ({activeStep=0}) => {

    const steps = [
        { label: 'Shipping Address' },
        { label: 'Payment Method' },
        { label: 'Place Order' },
      ];
  return (
    <div>
        <Stepper
         connectorStateColors={true}
         connectorStyleConfig={{
           completedColor: '#ffbd13',
           activeColor: '#ffbd13',
           disabledColor: '#eee'
         }}
         styleConfig={{
           activeBgColor: '#ffd813',
           completedBgColor: '#ffbd13',
           inactiveBgColor: '#eee',
           activeTextColor: '#111',
           completedTextColor: '#222',
           inactiveTextColor: '#444'
         }}
        steps={steps}
        activeStep={activeStep}/>
      
    </div>
  )
}

export default CheckoutWizard
