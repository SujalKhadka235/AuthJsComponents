"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card } from "../ui/card";
import CardWrapper from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSucess } from "../form-sucess";
const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [sucess, setSucess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (sucess || error) return;
    if (!token) {
      setError("Missing Token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSucess(data.sucess);
        setError(data.error);
      })
      .catch(() => {
        setError("SomeThing went Wrong");
      });
  }, [token, sucess, error]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming your Verification"
      backButtonLabel="Back to Login"
      backButtonhref="/auth/login"
    >
      <div className="w-full flex items-center justify-center">
        {!sucess && !error && <BeatLoader />}
        <FormSucess message={sucess} />
        {!sucess && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
