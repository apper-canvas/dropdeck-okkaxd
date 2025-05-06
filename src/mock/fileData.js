// Mock data for files and folders

const mockFiles = [
  {
    id: 'root',
    name: 'My Files',
    type: 'folder',
    path: '/root',
    children: ['folder1', 'folder2', 'file1', 'file2', 'file3', 'file4']
  },
  {
    id: 'folder1',
    name: 'Documents',
    type: 'folder',
    path: '/root/folder1',
    parent: 'root',
    children: ['folder1-1', 'file5', 'file6', 'file7']
  },
  {
    id: 'folder1-1',
    name: 'Work Projects',
    type: 'folder',
    path: '/root/folder1/folder1-1',
    parent: 'folder1',
    children: ['file8', 'file9']
  },
  {
    id: 'folder2',
    name: 'Media',
    type: 'folder',
    path: '/root/folder2',
    parent: 'root',
    children: ['file10', 'file11', 'file12']
  },
  {
    id: 'file1',
    name: 'Quarterly Report.pdf',
    type: 'application/pdf',
    size: 4500000,
    parent: 'root',
    path: '/root/file1',
    uploadedAt: new Date('2023-08-15T10:30:00'),
    starred: true
  },
  {
    id: 'file2',
    name: 'Profile Picture.jpg',
    type: 'image/jpeg',
    size: 1500000,
    parent: 'root',
    path: '/root/file2',
    uploadedAt: new Date('2023-09-20T14:45:00')
  },
  {
    id: 'file3',
    name: 'Project Timeline.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 2200000,
    parent: 'root',
    path: '/root/file3',
    uploadedAt: new Date('2023-10-05T09:15:00'),
    starred: true
  },
  {
    id: 'file4',
    name: 'Meeting Notes.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 800000,
    parent: 'root',
    path: '/root/file4',
    uploadedAt: new Date('2023-10-10T16:20:00')
  },
  {
    id: 'file5',
    name: 'Contract Agreement.pdf',
    type: 'application/pdf',
    size: 3200000,
    parent: 'folder1',
    path: '/root/folder1/file5',
    uploadedAt: new Date('2023-07-22T11:10:00')
  },
  {
    id: 'file6',
    name: 'Product Specifications.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 1100000,
    parent: 'folder1',
    path: '/root/folder1/file6',
    uploadedAt: new Date('2023-09-18T13:40:00')
  },
  {
    id: 'file7',
    name: 'Budget Overview.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 1800000,
    parent: 'folder1',
    path: '/root/folder1/file7',
    uploadedAt: new Date('2023-08-30T10:00:00')
  },
  {
    id: 'file8',
    name: 'Project Proposal.pdf',
    type: 'application/pdf',
    size: 2800000,
    parent: 'folder1-1',
    path: '/root/folder1/folder1-1/file8',
    uploadedAt: new Date('2023-07-05T15:30:00'),
    starred: true
  },
  {
    id: 'file9',
    name: 'Client Presentation.pptx',
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    size: 5100000,
    parent: 'folder1-1',
    path: '/root/folder1/folder1-1/file9',
    uploadedAt: new Date('2023-09-25T14:15:00')
  },
  {
    id: 'file10',
    name: 'Promotional Video.mp4',
    type: 'video/mp4',
    size: 158000000,
    parent: 'folder2',
    path: '/root/folder2/file10',
    uploadedAt: new Date('2023-06-12T09:45:00')
  },
  {
    id: 'file11',
    name: 'Product Photo.png',
    type: 'image/png',
    size: 3600000,
    parent: 'folder2',
    path: '/root/folder2/file11',
    uploadedAt: new Date('2023-08-17T11:25:00')
  }
];

export default mockFiles;