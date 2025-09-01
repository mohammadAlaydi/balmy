"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { defineStepper } from "@/components/ui/stepper";
import ShippingForm from "./shipping-form";

const { Stepper } = defineStepper(
  { id: "shipping", title: "Shipping" },
  { id: "payment", title: "Payment" }
);

export default function Checkout() {
  return (
    <div className="w-full xl:w-2/3 mx-auto">
      <Stepper.Provider className="space-y-4 my-5">
        {(params) => (
          <>
            <Stepper.Navigation>
              <Stepper.Step
                of="shipping"
                onClick={() => params.methods.goTo("shipping")}
              >
                <Stepper.Title>الشحن</Stepper.Title>
              </Stepper.Step>

              <Stepper.Step
                of="payment"
                onClick={() => params.methods.goTo("payment")}
              >
                <Stepper.Title>الدفع</Stepper.Title>
              </Stepper.Step>
            </Stepper.Navigation>

            {params.methods.switch({
              shipping: () => (
                <Stepper.Panel>
                  <ShippingForm />
                </Stepper.Panel>
              ),
              payment: () => (
                <Stepper.Panel>
                  <div className="p-4 border rounded-md">
                    Payment options go here.
                  </div>
                </Stepper.Panel>
              ),
            })}

            <Stepper.Controls className="pt-2">
              <Button variant="secondary" onClick={() => params.methods.prev()}>
                Back
              </Button>
              <Button onClick={() => params.methods.next()}>Next</Button>
            </Stepper.Controls>
          </>
        )}
      </Stepper.Provider>
    </div>
  );
}
