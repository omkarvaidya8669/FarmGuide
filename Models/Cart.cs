using System;
using System.Collections.Generic;

namespace LoginService.Models;

public partial class Cart
{
    public int Cartid { get; set; }

    public int Pfid { get; set; }

    public int Quantity { get; set; }

    public int Wid { get; set; }

    public virtual ICollection<Order>? Orders { get; set; } = new List<Order>();

    public virtual ProductFarmer Pf { get; set; } = null!;

    public virtual Wholesaler WidNavigation { get; set; } = null!;
}
