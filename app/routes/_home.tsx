import { Select, SelectItem } from "@nextui-org/react";
import type { MetaFunction } from "@remix-run/node";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useOutlet,
  useParams,
} from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { getPrograms } from "lib/api";
export const meta: MetaFunction = () => {
  return [
    { title: "KTU Results" },
    {
      name: "description",
      content: "Get KTU results regardless of how much their website sucks.",
    },
  ];
};

export const loader = async () => {
  return await getPrograms();
};

export default function Index() {
  const programs = useLoaderData<typeof loader>();
  const params = useParams();
  const navigate = useNavigate();
  const outlet = useOutlet();
  // const program = parseInt(searchParams.get("program") ?? "") ?? 0;
  console.log(params["program"]);
  const handleChange = (val: string) => {
    return navigate("/" + val);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className="tracking-tight inline font-semibold text-[2.3rem] lg:text-5xl leading-9">
          Get&nbsp;
        </h1>
        <h1 className="tracking-tight inline font-semibold from-[#FF1CF7] to-[#b249f8] text-[2.3rem] lg:text-5xl leading-9 bg-clip-text text-transparent bg-gradient-to-b">
          KTU&nbsp;
        </h1>
        <br />
        <h1 className="tracking-tight inline font-semibold text-[2.3rem] lg:text-5xl leading-9">
          results regardless of how much their website sucks.
        </h1>
      </div>
      <Select
        label="Stream"
        placeholder="Select a stream"
        className="max-w-lg w-full"
        name="program"
        selectedKeys={params["program"] ?? "0"}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        required
        disabledKeys={"0"}
      >
        {programs.map((program) => (
          <SelectItem key={program.id} value={program.id}>
            {program.name}
          </SelectItem>
        ))}
      </Select>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="mt-2 w-full max-w-lg"
          key={useLocation().pathname}
          initial={{ x: "10%", opacity: 0 }}
          animate={{ x: "0", opacity: 1 }}
          exit={{ x: "-40%", opacity: 0 }}
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
