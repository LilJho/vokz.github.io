"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { ToastTypes } from '@/lib/types'
import { toast } from '@/components/ui/use-toast'

interface IUseFormProps<T> {
    handleFormSubmit: (values: any) => Promise<void>;
    queryKey: string[];
    successMessage: ToastTypes
    errorMessage: ToastTypes
    schema: z.ZodSchema<T>;
    defaultValues: any;
}

const usePostForm = <T,>({ handleFormSubmit, queryKey, successMessage, errorMessage, schema, defaultValues }: IUseFormProps<T>) => {
    const queryClient = useQueryClient();

    const formMethods = useForm({
        resolver: zodResolver(schema),
        defaultValues
    });

    const { isLoading, mutateAsync } = useMutation(handleFormSubmit, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            toast({
                title: successMessage.title,
                description: successMessage.description,
                variant: successMessage.variant,
            })
            formMethods.reset();
        },
        onError: () => {
            toast({
                title: errorMessage.title,
                description: errorMessage.description,
                variant: errorMessage.variant,
            })
        },
    });

    const onSubmit = (data: z.infer<typeof schema>) => {
        mutateAsync(data);
    };

    return { formMethods, isLoading, onSubmit } as const
}

export default usePostForm