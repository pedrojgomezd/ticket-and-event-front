import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRequireAuth } from "../services/useIsRequiredAuth";
import LoadingComponent from "../src/common/LoadingComponent";

export default function Home() {
  const route = useRouter();

  route.push("customers");

  return <div></div>;
}
