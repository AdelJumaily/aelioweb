"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

interface CalendarProps {
  selectedDate?: string;
  onDateSelect?: (date: string) => void;
  minDate?: Date;
  maxDate?: Date;
}

export default function Calendar({ selectedDate, onDateSelect, minDate, maxDate }: CalendarProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "preliminary-consultation" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <Cal
      namespace="preliminary-consultation"
      calLink="aelio.dev/preliminary-consultation"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
