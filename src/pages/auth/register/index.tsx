import { IonCardHeader, IonButton, IonText, IonCardContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonInput } from '@ionic/react';
import { Link } from 'react-router-dom';
import Auth from '../../../layouts/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Input from '../../../components/Input';

const schema = yup.object({
    name: yup.string().required(),
    phone: yup.string().required().min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits'),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirm_password: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match'),
}).required();

const Register: React.FC = () => {

    const {
        handleSubmit,
        control,
        setValue,
        register,
        getValues,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(schema)
    });

    const fields = [
        {
            placeholder: "Enter name",
            label: "Name",
            type: "text",
            name: "name",
            inputmode: "text"
        },
        {
            placeholder: "Enter email",
            label: "Email",
            type: "email",
            name: "email",
            inputmode: "email"
        },
        {
            placeholder: "Enter phone",
            label: "Phone",
            type: "text",
            name: "phone",
            inputmode: "numeric"
        },
        {
            placeholder: "Enter password",
            label: "Password",
            type: "password",
            name: "password",
            inputmode: "text"
        },
        {
            placeholder: "Enter confirm password",
            label: "Confirm Password",
            type: "password",
            name: "confirm_password",
            inputmode: "text"
        },
    ];


    const onSubmit = (data: any) => {
        alert(JSON.stringify(data, null, 2));
    };

    return (
      <Auth>
        <IonCardHeader>
            <IonText color="success" className="text-center">
                <h3>REGISTRATION</h3>
            </IonText>
        </IonCardHeader>

        <IonCardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonList className="ion-no-padding">
                    {
                        fields.map((item, i) => <Input {...item} register={register} errors={errors} key={i}  />)
                    }
                </IonList>
                <IonButton color="success" type='submit' expand="full" shape="round" className="mt-2">Register</IonButton>
            </form>
            <IonGrid className="mt-1">
                <IonRow className="ion-align-items-center ion-justify-content-between">
                    <IonCol size="12">
                        <Link className='no-underline' to="/login">
                            <IonText color="dark">
                                <p className='fs-1-5 text-center'><b>Already have an account?</b></p>
                            </IonText>
                        </Link>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonCardContent>
      </Auth>
    );
  };
  
  export default Register;