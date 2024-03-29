import { useOutlet } from "@remix-run/react";
import { useState } from "react";

export default function AnimatedOutlet() {
  const [outlet] = useState(useOutlet());
  return outlet;
}
