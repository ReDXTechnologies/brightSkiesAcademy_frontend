import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-dialogform',
  templateUrl: './instance_guidance.component.html',
  styleUrls: ['./instance_guidance.component.scss'],
})
export class Instance_guidanceComponent implements OnInit {

   hpcPricingTableData = [
     {
       title: "c5n.xlarge",
       description: "It is a good choice for compute-intensive workloads that require very high network performance, such as those using MPI ",
       vCPUs: '4',
       RAM: "8 GiB",
       network_bandwidth: " 25 Gbps",
       price_per_hour: "$ 0.27 ",
     },
     {
       title: "c5.18xlarge",
       description: " It is best used for compute-intensive workloads that do not require high network performance",
       vCPUs: '36',
       RAM: "72 GiB",
       network_bandwidth: "25 Gbps ",
       price_per_hour: "$ 2.88 ",
     },
     {
       title: "c5n.18xlarge",
       description: " It is best used for compute-intensive workloads that require high network performance",
       vCPUs: '36',
       RAM: "192 GiB",
       network_bandwidth: "100 Gbps ",
       price_per_hour: "$ 3.06 ",
     },
     {
       title: "p3.2xlarge",
       description: " It is a good choice for running compute-intensive workloads such as those using OpenACC as it has one NVIDIA V100 GPU with 5,120 CUDA cores and 16 GiB of memory",
       vCPUs: '8',
       RAM: "61 GiB",
       network_bandwidth: "25 Gbps",
       price_per_hour: "$ 3.06 ",
     },
    // Add more pricing table data objects as needed...
  ];
  SoftwareDeploymentPricingTableData = [
    {
      title: "t3a.large",
      description: "Building software applications from source code that require moderate resources. suitable for form course type. ",
      vCPUs: '2  ',
      RAM: "8 GiB",
      network_bandwidth: " moderate ",
      price_per_hour: "$ 0.0768 ",
    },
    {
      title: "t3a.medium",
      description: " Managing software environments using module files for applications that have moderate resource requirements , recommended for Module file System course",
      vCPUs: '2',
      RAM: "4 GiB",
      network_bandwidth: " moderate  ",
      price_per_hour: "$ 0.0384",
    },
    {
      title: "m5.large",
      description: "Using package management utilities such as RPM, APT, and YUM for deploying and managing software applications that have moderate resource requirements.",
      vCPUs: '2',
      RAM: "8 GiB",
      network_bandwidth: "10 Gbps",
      price_per_hour: "$ 0.192 ",
    },
    {
      title: "m6g.large",
      description: "Deploying software applications and web servers that can take advantage of the cost savings and performance benefits of ARM-based processors",
      vCPUs: '2 ',
      RAM: "8 GiB",
      network_bandwidth: "10 Gbps",
      price_per_hour: "$ 0.128",
    },
    // Add more pricing table data objects as needed...
  ];
  BenchmarkingPricingTableData = [
    {
      title: "c5.2xlarge",
      description: "It is a good choice for CPU benchmarking workloads that require more compute power than the c5.xlarge instance type ",
      vCPUs: '8  ',
      RAM: "16 GiB",
      network_bandwidth: " Up to 10 Gbps ",
      price_per_hour: "$ 0.34 ",
    },
    {
      title: "c5.18xlarge",
      description: " It is a good choice for CPU benchmarking workloads that require a large number of vCPUs and high memory capacity, such as HPL, HPCC, HPL-AI, and HPCG.",
      vCPUs: '36',
      RAM: "72 GiB",
      network_bandwidth: "25 Gbps ",
      price_per_hour: "$ 2.88 ",
    },
    {
      title: "g4dn.xlarge",
      description: "It is a good choice for GPU benchmarking workloads as it has one NVIDIA T4 GPU with 16 GiB of memory",
      vCPUs: '4',
      RAM: "16 GiB",
      network_bandwidth: "Up to 25 Gbps",
      price_per_hour: "$ 0.736 ",
    },
    {
      title: "p3.2xlarge",
      description: " It is a good choice for GPU benchmarking workloads that require the highest level of GPU performance, as it has one NVIDIA V100 GPU with 5,120 CUDA cores and 16 GiB of memory",
      vCPUs: '8',
      RAM: "61 GiB",
      network_bandwidth: "Up to 25 Gbps",
      price_per_hour: "$ 3.06 ",
    },
    // Add more pricing table data objects as needed...
  ];
  constructor(private fb: UntypedFormBuilder, public dialog: MatDialog) {}
  public ngOnInit(): void {

  }
  closeDialog(): void {
    this.dialog.closeAll();
  }

}
