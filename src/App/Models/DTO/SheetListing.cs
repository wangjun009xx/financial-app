﻿namespace App.Models.DTO {
    using System.Runtime.Serialization;

    [DataContract]
    public class SheetListing {
        [DataMember(Name = "month")]
        public int Month { get; set; }

        [DataMember(Name = "year")]
        public int Year { get; set; }

        /// <summary>
        /// Custom name, if set
        /// </summary>
        [DataMember(Name = "name")]
        public string Name { get; set; }
    }
}