import { Formik, Form } from "formik";
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Box,
  Paper,
  Typography,
} from "@mui/material";


export default function ReusableForm({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitText = "Submit",
  cancelText = "Cancel",
  onCancel,
  withPaper = true,
  paperTitle,
}) {
  const renderField = (
    field,
    { values, errors, touched, handleChange, handleBlur, setFieldValue }
  ) => {
    const {
      name,
      label,
      type,
      placeholder,
      options,
      disabled,
      required,
      rows,
    } = field;

    const hasError = touched[name] && Boolean(errors[name]);
    const helperText = touched[name] && errors[name];

    switch (type) {
      case "select":
        return (
          <FormControl
            fullWidth
            error={hasError}
            variant="outlined"
            required={required}
          >
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
              labelId={`${name}-label`}
              id={name}
              name={name}
              value={values[name] ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              label={label}
              disabled={disabled}
            >
              {options?.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
            {hasError && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );

      case "checkbox":
        return (
          <FormControl
            error={hasError}
            required={required}
            component="fieldset"
          >
            <FormControlLabel
              control={
                <Checkbox
                  name={name}
                  checked={Boolean(values[name])}
                  onChange={(e) => setFieldValue(name, e.target.checked)}
                  onBlur={handleBlur}
                  disabled={disabled}
                  color="primary"
                />
              }
              label={label}
            />
            {hasError && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );

      case "radio":
        return (
          <FormControl
            error={hasError}
            required={required}
            component="fieldset"
          >
            <FormLabel component="legend" sx={{ mb: 1, fontSize: "0.875rem" }}>
              {label}
            </FormLabel>
            <RadioGroup
              name={name}
              value={values[name] ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              row
            >
              {options?.map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  value={opt.value}
                  control={<Radio disabled={disabled} color="primary" />}
                  label={opt.label}
                />
              ))}
            </RadioGroup>
            {hasError && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );

      case "textarea":
        return (
          <TextField
            fullWidth
            multiline
            rows={rows || 4}
            id={name}
            name={name}
            label={label}
            placeholder={placeholder}
            value={values[name] ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={hasError}
            helperText={helperText}
            disabled={disabled}
            required={required}
            variant="outlined"
          />
        );

      case "date":
        return (
          <TextField
            fullWidth
            type="date"
            id={name}
            name={name}
            label={label}
            placeholder={placeholder}
            value={values[name] ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={hasError}
            helperText={helperText}
            disabled={disabled}
            required={required}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        );

      case "number":
        return (
          <TextField
            fullWidth
            type="number"
            id={name}
            name={name}
            label={label}
            placeholder={placeholder}
            value={values[name] ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={hasError}
            helperText={helperText}
            disabled={disabled}
            required={required}
            variant="outlined"
          />
        );

      case "text":
      default:
        return (
          <TextField
            fullWidth
            type={type || "text"}
            id={name}
            name={name}
            label={label}
            placeholder={placeholder}
            value={values[name] ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={hasError}
            helperText={helperText}
            disabled={disabled}
            required={required}
            variant="outlined"
          />
        );
    }
  };

  const formContent = (formikProps) => (
    <Form noValidate>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {fields.map((field) => {
        
          const gridProps = field.grid || { xs: 12 };
          return (
            <Grid item key={field.name} {...gridProps}>
              {renderField(field, formikProps)}
            </Grid>
          );
        })}
      </Grid>
 
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: "flex-end",
          gap: 2,
          mt: 4,
        }}
      >
        {onCancel && (
          <Button
            type="button"
            variant="outlined"
            color="inherit"
            onClick={onCancel}
            disabled={formikProps.isSubmitting}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1,
              width: { xs: "100%", sm: "auto" },
              borderColor: "grey.300",
              color: "text.secondary",
              "&:hover": {
                borderColor: "grey.400",
                backgroundColor: "grey.50",
              },
            }}
          >
            {cancelText}
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={formikProps.isSubmitting}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            py: 1,
            width: { xs: "100%", sm: "auto" },
            boxShadow: "0 4px 12px rgba(25, 118, 210, 0.15)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(25, 118, 210, 0.25)",
            },
          }}
        >
          {formikProps.isSubmitting ? "Submitting..." : submitText}
        </Button>
      </Box>
    </Form>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        if (withPaper) {
          return (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              }}
            >
              {paperTitle && (
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    mb: 3,
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    color: "text.primary",
                  }}
                >
                  {paperTitle}
                </Typography>
              )}
              {formContent(formikProps)}
            </Paper>
          );
        }
        return (
          <Box sx={{ width: "100%" }}>
            {paperTitle && (
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  color: "text.primary",
                }}
              >
                {paperTitle}
              </Typography>
            )}
            {formContent(formikProps)}
          </Box>
        );
      }}
    </Formik>
  );
}
