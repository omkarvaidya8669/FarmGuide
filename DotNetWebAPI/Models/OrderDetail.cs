using System;
using System.Collections.Generic;

namespace LoginService.Models;

public partial class OrderDetail
{
    public int Odetailid { get; set; }

    public int Pfid { get; set; }

    public float Amount { get; set; }

    public int Quantity { get; set; }

    public int Oid { get; set; }

    public virtual Order OidNavigation { get; set; } = null!;

    public virtual ProductFarmer Pf { get; set; } = null!;
}
