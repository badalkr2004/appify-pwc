"use client";
import React from "react";

type Props = {
  params: { userId: string };
};
const AdminPage = ({ params: { userId } }: Props) => {
  return <div>{userId}</div>;
};

export default AdminPage;
