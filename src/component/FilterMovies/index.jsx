import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Close } from "neetoicons";
import * as Yup from "yup";

const FilterDropdown = ({ onClose, onApply, filterVisible }) => {
  const validationSchema = Yup.object().shape({
    year: Yup.string()
      .matches(/^[0-9]{4}$/, "Year must be a 4-digit number")
      .nullable(),
    type: Yup.array().min(1, "Select at least one type"),
  });

  return (
    <div
      className={`absolute right-0 mt-2 w-64 rounded-lg bg-white p-4 shadow-lg transition-opacity duration-300 ${
        filterVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <Close
        className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
        onClick={onClose}
      />
      <Formik
        initialValues={{ year: "", type: ["movie", "series"] }}
        validationSchema={validationSchema}
        onSubmit={onApply} // Auto-submitting not needed
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* Year Input */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Year</label>
              <Field
                className="w-full rounded border border-gray-300 px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                name="year"
                placeholder="Enter Year"
                type="text"
                onChange={e => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                  setFieldValue("year", onlyNums);

                  if (onlyNums.length === 4) {
                    onApply({ ...values, year: onlyNums }); // Auto update when year is 4 digits
                  }
                }}
              />
              <ErrorMessage
                className="text-sm text-red-500"
                component="div"
                name="year"
              />
            </div>
            {/* Type Checkboxes */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Type</label>
              <div className="flex flex-col">
                {["movie", "series"].map(option => (
                  <label className="flex items-center space-x-2" key={option}>
                    <Field
                      checked={values.type.includes(option)}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                      name="type"
                      type="checkbox"
                      value={option}
                      onChange={() => {
                        const updatedTypes = values.type.includes(option)
                          ? values.type.filter(t => t !== option)
                          : [...values.type, option];

                        setFieldValue("type", updatedTypes);
                        onApply({ ...values, type: updatedTypes }); // Auto update on type change
                      }}
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              <ErrorMessage
                className="text-sm text-red-500"
                component="div"
                name="type"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FilterDropdown;
