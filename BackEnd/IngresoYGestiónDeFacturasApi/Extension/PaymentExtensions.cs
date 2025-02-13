namespace IngresoYGestiónDeFacturasApi.Extension
{
    public static class PaymentExtensions
    {
        public static IEnumerable<PaymentMethodDTO> ToPaymentMethodDTOList(this IEnumerable<PaymentMethod> paymentMethod) =>
            paymentMethod.Select(p => new PaymentMethodDTO
            {
                Id = p.Id,
                Description = p.Description
            });

        public static PaymentMethodDTO ToPaymentMethodDTO(this PaymentMethod paymentMethod) =>
            new()
            {
                Id = paymentMethod.Id,
                Description = paymentMethod.Description
            };


        public static IEnumerable<PaymentStatusDTO> ToPaymentStatusDTOList(this IEnumerable<PaymentStatus> paymentStatus) =>
            paymentStatus.Select(p => new PaymentStatusDTO
            {
                Id = p.Id,
                Description = p.Description
            });

        public static PaymentStatusDTO ToPaymentStatusDTO(this PaymentStatus paymentStatus) =>
            new()
            {
                Id = paymentStatus.Id,
                Description = paymentStatus.Description
            };
    }
}
