import Button from "./Button";

export default function ButtonSubmit({
  children = "Submit",
  isSubmitting,
  formHasChanged = true,
  isValid = true,
}) {
  return (
    <Button
      disabled={isSubmitting || !formHasChanged || !isValid}
      type="submit">
      {isSubmitting ? "Submitting" : children}
    </Button>
  );
}
