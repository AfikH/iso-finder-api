const errorBreakdown = (error: unknown): { status: number; message: string } => {
  switch (error) {
    default:
      console.error(error);
      return { status: 500, message: "An unknown error has accured." };
  }
};

export default errorBreakdown;
