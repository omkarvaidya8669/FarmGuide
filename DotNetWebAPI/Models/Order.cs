using System;
using System.Collections.Generic;

namespace LoginService.Models;

public partial class Order
{
    public int Oid { get; set; }

    public int Cartid { get; set; }

    public DateTime Datetime { get; set; }

    public float Amount { get; set; }

    public virtual Cart Cart { get; set; } = null!;

    public virtual ICollection<OrderDetail>? OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<Payment>? Payments { get; set; } = new List<Payment>();
}
