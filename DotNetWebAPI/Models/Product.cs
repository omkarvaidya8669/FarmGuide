using System;
using System.Collections.Generic;

namespace LoginService.Models;

public partial class Product
{
    public int Pid { get; set; }

    public string Pname { get; set; } = null!;

    public virtual ICollection<ProductFarmer>? ProductFarmers { get; set; } = new List<ProductFarmer>();

    public virtual ICollection<Subproduct>? Subproducts { get; set; } = new List<Subproduct>();
}
