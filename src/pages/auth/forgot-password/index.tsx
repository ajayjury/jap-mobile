import { IonCardHeader, IonButton, IonText, IonCardContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonInput, IonCardSubtitle, IonLabel } from '@ionic/react';
import { Link } from 'react-router-dom';
import Auth from '../../../layouts/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Input from '../../../components/Input';

const schema = yup.object({
    email: yup.string().email().required(),
}).required();

const ForgotPassword: React.FC = () => {

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
            placeholder: "Enter email",
            label: "Email",
            type: "email",
            name: "email",
            inputmode: "email"
        }
      ];


      const onSubmit = (data: any) => {
        alert(JSON.stringify(data, null, 2));
      };

    return (
      <Auth>
        <IonCardHeader>
            <IonText color="success" className="text-center text-capitalize">
                <p>Enter your email and instructions will be sent to you!</p>
            </IonText>
        </IonCardHeader>

        <IonCardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <IonList className="ion-no-padding">
                    {
                        fields.map((item, i) => <Input {...item} register={register} errors={errors} key={i}  />)
                    }
                </IonList>
                <IonButton color="success" type='submit' expand="full" shape="round" className="mt-2">Reset Password</IonButton>
            </form>
            <IonGrid className="mt-1">
                <IonRow className="ion-align-items-center ion-justify-content-between">
                    <IonCol size="12">
                        <Link className='no-underline' to="/login">
                            <IonText color="dark">
                                <p className='fs-1-5 text-center'><b>Remember your password?</b></p>
                            </IonText>
                        </Link>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonCardContent>
      </Auth>
    );
  };
  
  export default ForgotPassword;