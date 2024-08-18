using System;
using System.Collections.Generic;

namespace LoginService.Models;

public partial class Subproduct
{
    public int Spid { get; set; }

    public string Spname { get; set; } = null!;

    public int Pid { get; set; }

    public virtual Product PidNavigation { get; set; } = null!;

    public virtual ICollection<ProductFarmer>? ProductFarmers { get; set; } = new List<ProductFarmer>();
}
