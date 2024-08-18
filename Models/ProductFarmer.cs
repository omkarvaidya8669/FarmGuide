using System;
using System.Collections.Generic;

namespace LoginService.Models;

public partial class ProductFarmer
{
    public int Pfid { get; set; }

    public int Fid { get; set; }

    public int? Spid { get; set; }

    public float Price { get; set; }

    public int Pid { get; set; }

    public int Quantity { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual Farmer FidNavigation { get; set; } = null!;

    public virtual ICollection<OrderDetail>? OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual Product PidNavigation { get; set; } = null!;

    public virtual Subproduct? Sp { get; set; }
}
