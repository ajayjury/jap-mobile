import { ErrorMessage } from "@hookform/error-message";
import { IonInput, IonItem } from "@ionic/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
    errors : FieldErrors<any>,
    register: UseFormRegister<any>,
    inputmode: any,
    label: string,
    type: any,
    name: any,
    placeholder: string,
};

const Input: React.FC<Props> = ({errors, register, label, type, name, placeholder, inputmode}) => {
    return (
        <>
            <IonItem className="ion-no-padding auth-card-background">
                <IonInput 
                    className="ion-no-padding" 
                    label={label} 
                    type={type}
                    inputmode={inputmode}
                    labelPlacement="floating" 
                    placeholder={placeholder}
                    {...register(name)}
                >
                </IonInput>
            </IonItem>
            <ErrorMessage
                errors={errors}
                name={name}
                as={<div style={{ color: 'red' }} />}
            />
        </>
    );
}

export default Input;