"use client"

import * as z from "zod";
import { RecordSchema } from '@/lib/validations/records'
import useExtractText from '@/hooks/useExtractText'

import RecordForm from './RecordForm'
import { CropRegionsType, ToastTypes } from '@/lib/types'
import { catchError, mime_types } from '@/lib/utils'
import usePostForm from '@/hooks/usePostForm';
import axios from 'axios';

const O2RingForm = () => {
  const defaultValues = {
    preview: "",
    file: null as unknown as File,
  }

  // const { extractTextFromRegions, progress } = useExtractText();

  const handleFormSubmit = async (values: z.infer<typeof RecordSchema>) => {
    try {
      const formData = new FormData();
      formData.append('record_file', values.file);  // Assuming 'yourFileInput' is your file input element
      formData.append('region_choice', 'ring');  // values: dashboard, bmi, ring
      formData.append("file_type", "pdf") // values: image, pdf
      const result = await axios.post('http://127.0.0.1:5000/v1/extract-metrics', formData)
      console.log({ result })
      // await DailyActivitiesService.create(data);
    } catch (error) {
      catchError(error);
    }
  };

  const { onSubmit, isLoading, formMethods } = usePostForm({
    handleFormSubmit,
    queryKey: ["o2-ring-report"],
    successMessage,
    errorMessage,
    schema: RecordSchema,
    defaultValues
  })

  return (
    <RecordForm
      handleSubmit={formMethods.handleSubmit(onSubmit)}
      isLoading={isLoading}
      title="O2 Ring Record Form"
      form={formMethods}
      description="Kindly submit your PDF File."
      acceptedTypes={mime_types.PDF_MIME_TYPE}
    />
  )
}

export default O2RingForm

const successMessage: ToastTypes = {
  title: "Upload Success",
  description: "Daily Medical Record Form Submitted",
  variant: "success"
}

const errorMessage: ToastTypes = {
  title: "Upload Failed",
  description: "Daily Medical Record Form Submission Failed",
  variant: "destructive"
}
