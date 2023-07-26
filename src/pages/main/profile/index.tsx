import {
    IonPage,
    IonContent,
    IonCard,
    IonButton,
    IonList,
    IonSpinner,
    IonToast,
} from "@ionic/react";
import BackHeader from "../../../components/BackHeader";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from '../../../components/Input';
import { axiosPublic } from "../../../../axios";
import { api_routes } from "../../../helper/routes";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { AxiosResponse } from "axios";

const fields = [
    {
      placeholder: "Enter name",
      label: "Name",
      type: "text",
      name: "name",
      inputmode: "text",
    },
    {
      placeholder: "Enter email",
      label: "Email",
      type: "email",
      name: "email",
      inputmode: "email",
    },
    {
        placeholder: "Enter phone",
        label: "Phone",
        type: "text",
        name: "phone",
        inputmode: "numeric",
    },
];

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required()
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
  })
  .required();

const Profile: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [isToastOpen, setIsToastOpen] = useState(false);
    const {auth} = useContext(AuthContext);

    const {
        handleSubmit,
        control,
        setValue,
        register,
        getValues,
        reset,
        setError,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

      useEffect(() => {
        getProfileDetails();
      
        return () => {}
      }, [auth])
      

      const onSubmit = async (data: any) => {
        setLoading(true);
        try {
          const response = await axiosPublic.post(api_routes.profile_update, data, {
            headers: {"Authorization" : `Bearer ${auth.token}`}
          });
          setResponseMessage(response.data.message);
          setIsToastOpen(true);
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message) {
            setResponseMessage(error?.response?.data?.message);
            setIsToastOpen(true);
          }
          if (error?.response?.data?.errors?.name) {
            setError("name", {
              type: "server",
              message: error?.response?.data?.errors?.name[0],
            });
          }
          if (error?.response?.data?.errors?.email) {
            setError("email", {
              type: "server",
              message: error?.response?.data?.errors?.email[0],
            });
          }
          if (error?.response?.data?.errors?.phone) {
            setError("phone", {
              type: "server",
              message: error?.response?.data?.errors?.phone[0],
            });
          }
        } finally {
          setLoading(false);
        }
      };

      const getProfileDetails = useCallback(
        async() => {
          try {
            const response:AxiosResponse = await axiosPublic.get(api_routes.profile, {
              headers: {"Authorization" : `Bearer ${auth.token}`}
            });
            setValue("name", response.data.user.name)
            setValue("email", response.data.user.email)
            setValue("phone", response.data.user.phone)
            
          } catch (error) {
            console.log(error);
          }
        },
        [auth],
      )
      

    return (
        <IonPage>
            <BackHeader title='Profile' link='/account' />
            <IonContent fullscreen={false} forceOverscroll={true}>
                <IonCard className="final-table mt-2">
                    <div className='ion-padding pt-0 pb-0'>
                        <div className="content-main mt-1">
                            <h6>Profile Information</h6>
                        </div>
                    </div>
                    <div className='ion-padding mb-1'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <IonList className="ion-no-padding">
                            {fields.map((item, i) => (
                                <Input
                                {...item}
                                register={register}
                                errors={errors}
                                key={i}
                                />
                            ))}
                            </IonList>
                            <IonButton
                                color="success"
                                type="submit"
                                expand="block"
                                shape="round"
                                className="mt-2"
                            >
                            {loading ? (
                                <IonSpinner name="crescent"></IonSpinner>
                            ) : (
                                "Update"
                            )}
                            </IonButton>
                        </form>
                    </div>
                    
                </IonCard>

                <div className="ion-padding">
                    <IonToast
                        isOpen={isToastOpen}
                        message={responseMessage}
                        onDidDismiss={() => setIsToastOpen(false)}
                        duration={5000}
                        buttons={[
                        {
                            text: "Close",
                            handler: () => {
                            setIsToastOpen(false);
                            },
                        },
                        ]}
                        layout="stacked"
                    ></IonToast>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
